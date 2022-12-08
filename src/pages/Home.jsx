import { Button, message, Select, Table } from "antd";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../resourses/default-layout.css";
import AddEditTransactionModal from "../components/AddEditTransactionModal";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState("all");
  const [viewType, setViewType] = useState("table");
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  // get all transactions
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user-expense"));
      setLoading(true);
      const resposne = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/transactions/get-all-transactions`,
        {
          userId: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      console.log(resposne.data);
      setTransactionsData(resposne.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // Delete Transaction
  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/transactions/delete-transaction`,
        {
          transactionId: record._id,
        }
      );
      message.success("Record Deleted ");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  // antd table columns

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      // render: (date) => (
      //   <label>{moment(date).utc().format("YYYY-MM-DD")}</label>
      // ),
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-3">
            <AiOutlineEdit
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
              className="cursor-pointer hover:text-red-400"
              size={20}
            />
            <AiOutlineDelete
              onClick={() => {
                deleteTransaction(record);
              }}
              className="cursor-pointer"
              size={20}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <div className="filter shadow-red-900 flex justify-between items-center">
        {/* DROPDOWN MAIN CONTAINER */}
        <div className="flex justify-evenly items-center">
          {/* Select Dates Dropdown */}
          <div className="flex flex-col ">
            <h6>Select frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>

            {frequency === "custom" && (
              <div className="m-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>

          {/* Select Type Dropdown */}
          <div className="flex flex-col mx-5 ">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
        </div>
        <div className="flex gap-7 items-center">
          <div className="view-switch flex gap-3 ">
            <AiOutlineUnorderedList
              onClick={() => setViewType("table")}
              size={30}
              className={` ${
                viewType === "table" ? "active" : "inactive"
              } cursor-pointer hover:rotate-180 ease-in duration-300`}
            />
            <TbBrandGoogleAnalytics
              onClick={() => setViewType("analytics")}
              size={30}
              className={` ${
                viewType === "analytics" ? "active" : "inactive"
              } cursor-pointer hover:rotate-90 ease-in duration-300`}
            />
          </div>
          <Button onClick={() => setShowAddEditTransactionModal(true)}>
            Add New
          </Button>
        </div>
      </div>
      <div className="table-analytics">
        {viewType === "table" ? (
          <Table
            className="overflow-scroll "
            columns={columns}
            dataSource={transactionsData}
          />
        ) : (
          <Analytics transactionsData={transactionsData} />
        )}
      </div>

      {/* Add Transaction MODAL */}

      {showAddEditTransactionModal && (
        <AddEditTransactionModal
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          getTransactions={getTransactions}
          selectedItemForEdit={selectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
};

export default Home;
