import React, { useState } from "react";
import { Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const AddEditTransactionModal = ({
  showAddEditTransactionModal,
  setShowAddEditTransactionModal,
  getTransactions,
  selectedItemForEdit,
  setSelectedItemForEdit,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user-expense"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transactions/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Transaction Edited Successfully");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userId: user._id,
        });
        getTransactions();
        message.success("Transaction Added Successfully");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error("something went wrong");
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
      open={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medicaL">MedicaL</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>
        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="bg-green-200 p-3 w-[100px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-green-300 transition-all "
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditTransactionModal;
