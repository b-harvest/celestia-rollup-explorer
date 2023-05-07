import styled from "styled-components";
import { Table } from "@mantine/core";
import { SimpleGrid, Text } from "@mantine/core";
import { useEffect } from "react";
import axios from "axios";
import { useStore } from "../../utils/store";
import { useRouter } from "next/router";

const StatBox = styled.div`
  flex: 1;
  border: 1px solid rgb(229, 232, 235);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ransition: all 0.2s ease 0s;
  &:hover {
    cursor: pointer;
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  }
`;

const StatCount = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const StatTitle = styled.div`
  font-size: 19px;
  color: grey;
`;

const Description = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const NameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Block = () => {
  const router = useRouter();
  let { nid } = router.query;

  const [collections, setCollections] = useStore((state) => [state.collections, state.setCollections]);
  const [rawData, setRawData] = useStore((state) => [state.collections, state.setCollections]);
  //const [rows, setRows] = useStore();
  

  const getRawData = async () => {
    let path = window.location.pathname.split("/")
    if(path.length==3) {
      nid = path[2];
    }
    if (nid) {
      const {
        data: rawData,
      } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/rollups/${nid}`);
      rawData?.blobsRows?.forEach(function(element) {
        element.href = `/rollups/${element.nid}/blocks/${element.height}`;
      });
      rawData?.rollupTxRows?.forEach(function(element) {
        element.href = `/rollups/${element.nid}/txs/${element.txhash}`;
      });
      setRawData(rawData);
    }
  };

  useEffect(() => {
    getRawData();
  }, []);

  const rows = rawData?.blobsRows?.map((element, idx) => (
    <tr key={idx}>
      <td style={{ fontSize: "14px" }}><a href={element?.href}>{element?.blockHash?.substr(0,5)}...{element?.blockHash?.substr(element?.blockHash?.length-5,5)}</a></td>
      <td style={{ fontSize: "14px" }}>{element?.height}</td>
      <td style={{ fontSize: "14px" }}>{element?.heightCore}</td>
      <td style={{ fontSize: "14px" }}>{element?.txCnt}</td>
      <td style={{ fontSize: "14px" }}>{element?.time}</td>
    </tr>
  ));
  const rowsTX = rawData?.rollupTxRows?.map((element, idx) => (
    <tr key={idx}>
      <td style={{ fontSize: "14px" }}><a href={element?.href}>{element?.txhash?.substr(0,5)}...{element?.txhash?.substr(element?.txhash?.length-5,5)}</a></td>
      <td style={{ fontSize: "14px" }}>{element?.height}</td>
      <td style={{ fontSize: "14px" }}>{element?.typeUrl}</td>
      <td style={{ fontSize: "14px" }}>{element?.time}</td>
    </tr>
  ));

  return (
    <div>
        <Text style={{ color: "#444", fontSize: "38px", margin: "0px 0 0px 40px", fontWeight: "bold" }} align="left">
        Chain: {nid}
        </Text>
        <SimpleGrid
          style={{ padding: "0 30px", margin:"0px 0px 50px 0px" }}
          cols={1}
          spacing="lg"
          breakpoints={[
            { maxWidth: 1250, cols: 1, spacing: "md" },
            { maxWidth: 850, cols: 1, spacing: "sm" },
          ]}
        >
        {/* <Table>
          <tbody>
            <tr><td width="20%">Block Hash</td><td>{rawData?.blockRow?.blockHash}</td></tr>  
            <tr><td width="20%">Chain ID</td><td>{rawData?.blockRow?.chainId}</td></tr>  
            <tr><td width="20%">Height</td><td>{rawData?.blockRow?.height}</td></tr>  
            <tr><td width="20%">Time</td><td>{rawData?.blockRow?.time}</td></tr>  
            <tr><td width="20%">Proposer Address</td><td>{rawData?.blockRow?.proposerAddress}</td></tr>  
            <tr><td width="20%">Tx #</td><td>{rawData?.blockRow?.txCnt}</td></tr>  
            <tr><td width="20%">Blob #</td><td>{rawData?.blockRow?.blobCnt}</td></tr>  
            <tr><td width="20%">Square Size</td><td>{rawData?.blockRow?.squareSize}</td></tr>  
          </tbody>
        </Table> */}
        </SimpleGrid>

      <div style={{ margin: "0px 0px 20px 0px"}}>
        <Text style={{ color: "#444", fontSize: "20px", margin: "0px 0 20px 40px", fontWeight: "bold" }} align="left">
          Summary
        </Text>
        <SimpleGrid
          style={{ padding: "0 30px", margin:"0px 0px 50px 0px" }}
          cols={1}
          spacing="lg"
          breakpoints={[
            { maxWidth: 1250, cols: 1, spacing: "md" },
            { maxWidth: 850, cols: 1, spacing: "sm" },
          ]}
        >
        <Table>
          <tbody>
            <tr><td width="20%">Namespace ID</td><td>{rawData?.chainSummary?.nid}</td></tr>  
            <tr><td width="20%">Namespace ID (base64)</td><td>{rawData?.chainSummary?.nidBase64}</td></tr>  
            <tr><td width="20%">Chain ID</td><td>{rawData?.chainSummary?.chainId}</td></tr>  
            <tr><td width="20%">Height</td><td>{rawData?.chainSummary?.height}</td></tr>  
            <tr><td width="20%">Updated Time</td><td>{rawData?.chainSummary?.time}</td></tr>  
            <tr><td width="20%">Total Tx #</td><td>{rawData?.chainSummary?.cntTx}</td></tr>   
          </tbody>
        </Table>
        </SimpleGrid>
      </div>

      <div style={{ margin: "0px 0px 40px 0px"}}>
        <Text style={{ color: "#444", fontSize: "20px", margin: "0px 0 20px 40px", fontWeight: "bold" }} align="left">
          Blobs (Block information of chain)
        </Text>
        <SimpleGrid
          style={{ padding: "0 30px" }}
          cols={1}
          spacing="lg"
          breakpoints={[
            { maxWidth: 1250, cols: 1, spacing: "md" },
            { maxWidth: 850, cols: 1, spacing: "sm" },
          ]}
        >
          <Table>
            <thead>
              <tr>
                <th>Blob Hash</th>
                <th>Height</th>
                <th>Celestia Height</th>
                <th>TX #</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </SimpleGrid>
      </div>

      <div style={{ margin: "0px 0px 100px 0px"}}>
        <Text style={{ color: "#444", fontSize: "20px", margin: "0px 0 20px 40px", fontWeight: "bold" }} align="left">
          Transactions
        </Text>
        <SimpleGrid
          style={{ padding: "0 30px" }}
          cols={1}
          spacing="lg"
          breakpoints={[
            { maxWidth: 1250, cols: 1, spacing: "md" },
            { maxWidth: 850, cols: 1, spacing: "sm" },
          ]}
        >
          <Table>
            <thead>
              <tr>
                <th>TX Hash</th>
                <th>Height</th>
                <th>Type URL</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>{rowsTX}</tbody>
          </Table>
        </SimpleGrid>
      </div>
    </div>
  )
}

export default Block;