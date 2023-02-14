import React from "react";
import { Input, Modal, Table } from "antd";
import { useState } from "react";
import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";

function TableData() {
  let timeStamp = new Date().toLocaleString();
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const randomStatus = () => {
    const status = ["Done", "Working", "Open", "Overdue"];
    return status[Math.floor(Math.random() * status.length)];
  };

  const onEditOutlined = (record) => {
    setIsEditing(true);
    setEditingData({ ...record });
  };

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      time: timeStamp,
      title: `Task 1`,
      description: "Description 1",
      dueDate: "8/20/2025, 11:00:00 AM",
      status: "Open",
      age: 10,
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "Timestamp",
      dataIndex: "time",
      sorter: function (a, b) {
        return a.time - b.time;
      },
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
      sorter: function (a, b) {
        return a.title - b.title;
      },
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
      sorter: function (a, b) {
        return a.description - b.description;
      },
    },
    {
      key: "4",
      title: "Due Date",
      dataIndex: "dueDate",
      sorter: function (a, b) {
        return a.dueDate - b.dueDate;
      },
    },
    {
      key: "5",
      title: "Status",
      dataIndex: "status",
      sorter: function (a, b) {
        return a.status - b.status;
      },
      // Creating filter object for the status column with unique values
      filters: [
        { text: "Done", value: "Done" },
        { text: "Working", value: "Working" },
        { text: "Open", value: "Open" },
        { text: "Overdue", value: "Overdue" },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
    {
      key: "6",
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <>
            <EditOutlined onClick={() => onEditOutlined(record)} />
            <DeleteOutlined
              onClick={() => {
                setDataSource(
                  dataSource.filter((item) => item.key !== record.key)
                );
              }}
              style={{ marginLeft: "10px" }}
            />
          </>
        );
      },
    },
  ];

  const resetData = () => {
    setEditingData(null);
    setIsEditing(false);
  };
  const addTask = () => {
    setDataSource([
      ...dataSource,
      {
        // Adding new task when clicking the button, with the new task's timestamp
        key: dataSource.length + 1,
        time: timeStamp,
        title: `Task ${dataSource.length + 1}`,
        description: `Description ${dataSource.length + 1}`,
        dueDate: new Date(
          new Date().getTime() + Math.random() * 100000000000
        ).toLocaleString(),
        status: randomStatus(),
      },
    ]);
  };
  return (
    <>
      <div
        className="table"
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "50vw",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px auto",
        }}
      >
        <button
          onClick={addTask}
          style={{
            width: "100px",
            height: "30px",
            backgroundColor: "blue",
            color: "white",
            borderRadius: "5px",
            border: "none",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          Add New Task
        </button>

        <Table
        style={{
          width: "100%",
          borderRadius: "5px",
          border: "1px solid black",
          textAlign: "center",
        }}
          columns={columns}
          dataSource={dataSource.map((task) => task)}
        ></Table>
        <Modal
          title="Basic Modal"
          okText="Save"
          open={isEditing}
          onOk={() => {
            const newDataSource = [...dataSource];
            const index = newDataSource.findIndex(
              (item) => item.key === editingData.key
            );
            newDataSource[index] = editingData;
            setDataSource(newDataSource);
            resetData();
          }}
          onCancel={() => {
            resetData();
          }}
        >
          <Input
            placeholder="Title"
            value={editingData?.title}
            onChange={(data) => {
              setEditingData({ ...editingData, title: data.target.value });
            }}
          />
          <Input
            placeholder="Description"
            value={editingData?.description}
            onChange={(data) => {
              setEditingData({
                ...editingData,
                description: data.target.value,
              });
            }}
          />
        </Modal>
      </div>
    </>
  );
}

export default TableData;
