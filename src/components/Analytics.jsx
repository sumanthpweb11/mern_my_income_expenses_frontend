import { Progress } from "antd";
import React from "react";
import "../resourses/default-layout.css";

const Analytics = ({ transactionsData }) => {
  // Total Transactions
  const totalTransactions = transactionsData.length;

  // Total Icome T
  const totalIcomeTransactions = transactionsData.filter(
    (t) => t.type === "income"
  );

  // Total Expense T
  const totalExpenseTransactions = transactionsData.filter(
    (t) => t.type === "expense"
  );

  // Total Income T %
  const totalIncomeTransactionsPercentage =
    (totalIcomeTransactions.length / totalTransactions) * 100;

  // Total Expense T %
  const totalExpenseTransactionsPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  //.................TURNOVER CALCULATIONS-----------------------
  const totalTurover = transactionsData.reduce((acc, curtran) => {
    return acc + curtran.amount;
  }, 0);

  const totalIncomeTurover = transactionsData
    .filter((t) => t.type === "income")
    .reduce((acc, curtran) => {
      return acc + curtran.amount;
    }, 0);

  const totalExpenseTurover = transactionsData
    .filter((t) => t.type === "expense")
    .reduce((acc, curtran) => {
      return acc + curtran.amount;
    }, 0);

  const totalIncomeTurnoverPercentage =
    (totalIncomeTurover / totalTurover) * 100;

  const totalExpenseTurnoverPercentage =
    (totalExpenseTurover / totalTurover) * 100;

  // ----------------CATEGORY CALCULATIONS-------------------------

  const categories = [
    "salary",
    "entertainment",
    "freelance",
    "food",
    "travel",
    "investment",
    "education",
    "medical",
    "tax",
  ];

  return (
    <div>
      {/* ROW 1 Tabs */}
      <div className=" flex flex-col md:flex-row mt-3 justify-between items-center ">
        <div className="tab1container w-1/2">
          <div className="transaction-count">
            <h4>Total Transactions:{totalTransactions}</h4>
            <hr />
            <h5>Icome: {totalIcomeTransactions.length}</h5>
            <h4>Expense:{totalExpenseTransactions.length} </h4>

            <div className="progress-bars mt-2 flex flex-col md:flex  justify-around items-center gap-2 ">
              <Progress
                type="circle"
                percent={
                  !totalIncomeTransactionsPercentage
                    ? totalIncomeTransactionsPercentage
                    : totalIncomeTransactionsPercentage.toFixed(0)
                }
                strokeColor="green"
              />
              <Progress
                type="circle"
                percent={
                  !totalExpenseTransactionsPercentage
                    ? totalExpenseTransactionsPercentage
                    : totalExpenseTransactionsPercentage.toFixed(0)
                }
                strokeColor="red"
              />
            </div>
          </div>
        </div>

        <div className="tab2container w-1/2">
          <div className="turnover-count">
            <div className="transaction-count">
              <h4>Total Turnover:{totalTurover}</h4>
              <hr />
              <h5>Icome Turnover: {totalIncomeTurover}</h5>
              <h4>Expense Turnover:{totalExpenseTurover} </h4>

              <div className="progress-bars mt-2 flex flex-col md:flex justify-around  items-center gap-2 ">
                <Progress
                  type="circle"
                  percent={
                    !totalIncomeTurnoverPercentage
                      ? totalIncomeTurnoverPercentage
                      : totalIncomeTurnoverPercentage.toFixed(0)
                  }
                  strokeColor="green"
                />
                <Progress
                  type="circle"
                  percent={
                    !totalExpenseTurnoverPercentage
                      ? totalExpenseTurnoverPercentage
                      : totalExpenseTurnoverPercentage.toFixed(0)
                  }
                  strokeColor="red"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2 Tabs */}
      <div className="flex mt-3 justify-between items-center">
        <div className="incomecontainer w-1/2">
          <div className="income-category-analysis">
            <h4>Income - Category Wise</h4>
            {categories.map((category, index) => {
              const amount = transactionsData
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div key={index} className="category-card">
                    <h5>{category}</h5>
                    <Progress
                      strokeColor="#0B5AD9"
                      percent={((amount / totalIncomeTurover) * 100).toFixed(0)}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>

        <div className="expensecontainer w-1/2">
          <div className="expense-category-analysis">
            <h4>Expence - Category Wise</h4>
            {categories.map((category, index) => {
              const amount = transactionsData
                .filter((t) => t.type === "expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div key={index} className="category-card">
                    <h5>{category}</h5>
                    <Progress
                      strokeColor="#0B5AD9"
                      percent={((amount / totalExpenseTurover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
