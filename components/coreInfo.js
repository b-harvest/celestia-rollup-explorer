import Image from "next/image";
import styled from "styled-components";
import { Table } from "@mantine/core";
import { SimpleGrid, Text } from "@mantine/core";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CoreInfo = ({ data, rpc }) => {
  return (
    <>
      <div style={{ margin: "0px auto 20px auto", maxWidth: "864px" }} className="basic-card">
        <div className="card-title">Status</div>
        <SimpleGrid
          style={{ padding: "0 0px", margin: "0px 0px 0px 0px" }}
          cols={1}
          spacing="lg"
          breakpoints={[
            { maxWidth: 1250, cols: 1, spacing: "md" },
            { maxWidth: 850, cols: 1, spacing: "sm" },
          ]}
        >
          <div>
            <div className="detail-card">
              <div className="card-body__title ">Total App Chains</div>
              <div className="card-body__body card-body__body-purple">{data?.cntNIDs}</div>
            </div>

            <div className="half-detail-row ">
              <div className="detail-card half-detail">
                <div className="card-body__title">Total Rollup TXs</div>
                <div className="card-body__body">{data?.cntTXs}</div>
              </div>
              <div className="detail-card half-detail">
                <div className="card-body__title">Total Rollup Blobs</div>
                <div className="card-body__body">{data?.cntBlobs}</div>
              </div>
            </div>

            <div className="half-detail-row ">
              <div className="detail-card half-detail">
                <div className="card-body__title">Chain ID</div>
                <div className="card-body__body">{rpc?.result.block.header.chain_id}</div>
              </div>
              <div className="detail-card half-detail">
                <div className="card-body__title">Latest Block</div>
                <div className="card-body__body">{rpc?.result.block.header.height}</div>
              </div>
            </div>
            <div className="last-updated-text">Last updated at {rpc?.result.block.header.time}</div>

            {/* <td width="20%" className="card-body__title">
              
            
            
          
              <td width="20%"></td>
              <td>
                <b>{data?.cntBlobs}</b>
              </td>
              <td width="20%">Latest Block</td>
              <td>
                <b>{rpc?.result.block.header.height}</b>
              </td>
            </tr>
            <tr>
              <td width="20%">Total Rollup TXs</td>
              <td>
                <b>{data?.cntTXs}</b>
              </td>
              <td width="20%">Time</td>
              <td>
                <b>{rpc?.result.block.header.time}</b>
              </td>
            </tr> */}
          </div>
        </SimpleGrid>
      </div>
    </>
  );
};

export default CoreInfo;
