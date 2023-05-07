import styled from "styled-components";
import { Table } from "@mantine/core";
import { SimpleGrid, Text } from "@mantine/core";
import { useEffect } from "react";
import axios from "axios";
import { useStore } from "../../../../utils/store";
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
  let { nid, txhash } = router.query;

  const [collections, setCollections] = useStore((state) => [state.collections, state.setCollections]);
  const [rawData, setRawData] = useStore((state) => [state.collections, state.setCollections]);
  //const [rows, setRows] = useStore();
  

  const getRawData = async () => {
    let path = window.location.pathname.split("/")
    if(path.length==5) {
      nid = path[2];
      txhash = path[4];
    }
    if (nid) {
      const {
        data: rawData,
      } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/rollups/${nid}/txs/${txhash}`);
      if(rawData?.txRow) {
        rawData.txRow.hrefNID = "/rollups/" + rawData.txRow.nid;
        rawData.txRow.hrefBlob = `/rollups/${rawData.txRow.nid}/blocks/${rawData.txRow.height}`;
      }
      setRawData(rawData);
    }
  };

  useEffect(() => {
    getRawData();
  }, []);

  return (
    <div>
        <Text style={{ color: "#444", fontSize: "38px", margin: "0px 0 20px 40px", fontWeight: "bold" }} align="left">
        Transaction Details
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
            <tr><td width="20%">TX Hash</td><td>{rawData?.txRow?.txhash}</td></tr>  
            <tr><td width="20%">Type URL</td><td>{rawData?.txRow?.typeUrl}</td></tr>  
            <tr><td width="20%">Namespace ID</td><td><a href={rawData?.txRow?.hrefNID}>{rawData?.txRow?.nid}</a></td></tr>  
            <tr><td width="20%">Namespace ID (base64)</td><td>{rawData?.txRow?.nidBase64}</td></tr>  
            <tr><td width="20%">Chain ID</td><td>{rawData?.txRow?.chainId}</td></tr>  
            <tr><td width="20%">Height</td><td><a href={rawData?.txRow?.hrefBlob}>{rawData?.txRow?.height}</a></td></tr>  
            <tr><td width="20%">Time</td><td>{rawData?.txRow?.time}</td></tr>  
            <tr><td width="20%">Memo</td><td>{rawData?.txRow?.memo}</td></tr>  
            <tr><td width="20%">Fee Amount</td><td>{rawData?.txRow?.feeAmount}</td></tr>  
            <tr><td width="20%">Fee Gas Limit</td><td>{rawData?.txRow?.feeGasLimit}</td></tr>  
          </tbody>
        </Table>
        </SimpleGrid>

    </div>
  )
}

export default Block;