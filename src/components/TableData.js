import React from 'react'
import { Table } from 'antd'

function TableData() {
  return (
    <>
    <div className="table">
      <Table>
        <Table.Column title="Timestamp" dataIndex="time" key="time" />
        <Table.Column title="Age" dataIndex="age" key="age" />
        <Table.Column title="Address" dataIndex="address" key="address" />

      </Table>
    </div>
    </>
  )
}

export default TableData