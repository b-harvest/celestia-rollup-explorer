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
  let { height } = router.query;

  const [collections, setCollections] = useStore((state) => [state.collections, state.setCollections]);
  const [rawData, setRawData] = useStore((state) => [state.collections, state.setCollections]);
  //const [rows, setRows] = useStore();
  

  const getRawData = async () => {
    let path = window.location.pathname.split("/")
    if(path.length==3) {
      height = path[2];
    }
    if (height) {
      const {
        data: rawData,
      } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/blocks/${height}`);
      rawData?.blobsRows?.forEach(function(element) {
        element.href = `/rollups/${element.nid}/blocks/${element.height}`;
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
      <td style={{ fontSize: "14px" }}>{element?.nid}</td>
      <td style={{ fontSize: "14px" }}>{element?.shareVersion}</td>
      <td style={{ fontSize: "14px" }}>{element?.chainId}</td>
      <td style={{ fontSize: "14px" }}>{element?.height}</td>
      <td style={{ fontSize: "14px" }}>{element?.heightCore}</td>
      <td style={{ fontSize: "14px" }}>{element?.txCnt}</td>
      <td style={{ fontSize: "14px" }}>{element?.time}</td>
    </tr>
  ));

  return (
    <div>
        <Text style={{ color: "#444", fontSize: "38px", margin: "0px 0 20px 40px", fontWeight: "bold" }} align="left">
        Details for Block #{height}
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
            <tr><td width="20%">Blob Hash</td><td>{rawData?.blockRow?.blockHash}</td></tr>  
            <tr><td width="20%">Chain ID</td><td>{rawData?.blockRow?.chainId}</td></tr>  
            <tr><td width="20%">Height</td><td>{rawData?.blockRow?.height}</td></tr>  
            <tr><td width="20%">Time</td><td>{rawData?.blockRow?.time}</td></tr>  
            <tr><td width="20%">Proposer Address</td><td>{rawData?.blockRow?.proposerAddress}</td></tr>  
            <tr><td width="20%">Tx #</td><td>{rawData?.blockRow?.txCnt}</td></tr>  
            <tr><td width="20%">Blob #</td><td>{rawData?.blockRow?.blobCnt}</td></tr>  
            <tr><td width="20%">Square Size</td><td>{rawData?.blockRow?.squareSize}</td></tr>  
          </tbody>
        </Table>
        </SimpleGrid>

      <div style={{ margin: "0px 0px 100px 0px"}}>
        <Text style={{ color: "#444", fontSize: "20px", margin: "0px 0 20px 40px", fontWeight: "bold" }} align="left">
          Blobs
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
                <th>Namespace ID</th>
                <th>Share Version</th>
                <th>Chain ID</th>
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
    </div>
  )
}

export default Block;