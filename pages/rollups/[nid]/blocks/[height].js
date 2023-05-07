import styled from "styled-components";
import { Table } from "@mantine/core";
import { SimpleGrid, Text } from "@mantine/core";
import { useEffect } from "react";
import axios from "axios";
import { useStore } from "../../../../utils/store";
import { useRouter } from "next/router";

const Test = styled.div`
  width: 800px;
  max-width: 800px;
  word-break:break-all;
`;

const Collections = () => {
  const [collections, setCollections] = useStore((state) => [state.collections, state.setCollections]);
  const [rawData, setRawData] = useStore((state) => [state.collections, state.setCollections]);
  //const [rows, setRows] = useStore();
  const router = useRouter();
  let { height, nid } = router.query;

  const getRawData = async () => {
    let path = window.location.pathname.split("/")
    if(path.length==5) {
      nid = path[2];
      height = path[4];
    }
    if (nid && height) {
      const {
        data: rawData,
      } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/rollups/${nid}/blocks/${height}`);
      rawData?.rollupTxRows?.forEach(function(element) {
        element.href = `/rollups/${element.nid}/txs/${element.txhash}`;
      });
      if(rawData?.blobRow) {
        rawData.blobRow.hrefNID = "/rollups/" + rawData.blobRow.nid;
      }
      setRawData(rawData);
    }
  };

  useEffect(() => {
    getRawData();
  }, []);

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
        <Text style={{ color: "#444", fontSize: "38px", margin: "0px 0 20px 40px", fontWeight: "bold" }} align="left">
        Blob Details
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
            <tr><td width="30%">Blob Hash</td><td>{rawData?.blobRow?.blockHash}</td></tr>  
            <tr><td width="30%">Namespace ID (base64)</td><td>{rawData?.blobRow?.nidBase64}</td></tr>  
            <tr><td width="30%">Namespace ID</td><td><a href={rawData?.blobRow?.hrefNID}>{rawData?.blobRow?.nid}</a></td></tr>  
            <tr><td width="30%">Share Version</td><td>{rawData?.blobRow?.shareVersion}</td></tr>  
            <tr><td width="30%">Chain ID</td><td>{rawData?.blobRow?.chainId}</td></tr>  
            <tr><td width="30%">Height</td><td>{rawData?.blobRow?.height}</td></tr>  
            <tr><td width="30%">Height Core</td><td>{rawData?.blobRow?.heightCore}</td></tr>  
            <tr><td width="30%">Time</td><td>{rawData?.blobRow?.time}</td></tr>  
            <tr><td width="30%">Version App</td><td>{rawData?.blobRow?.versionApp}</td></tr>  
            <tr><td width="30%">Version Block</td><td>{rawData?.blobRow?.versionBlock}</td></tr>  
            <tr><td width="30%">Validator #</td><td>{rawData?.blobRow?.validatorCnt}</td></tr>  
            <tr><td width="30%">TX #</td><td>{rawData?.blobRow?.txCnt}</td></tr>  
            <tr><td width="30%">blob (base64)</td><Test><td>{rawData?.blobRow?.blobBase64}</td></Test></tr>  
          </tbody>
        </Table>
        </SimpleGrid>

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
};

export default Collections;
