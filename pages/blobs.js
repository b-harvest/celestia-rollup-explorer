import { Table } from "@mantine/core";
import { SimpleGrid, Text, Divider } from "@mantine/core";
import { useEffect } from "react";
import axios from "axios";
import { useStore } from "../utils/store";
import { useRouter } from "next/router";

const Collections = () => {
  const [collections, setCollections] = useStore((state) => [state.collections, state.setCollections]);
  const [rawData, setRawData] = useStore((state) => [state.collections, state.setCollections]);
  //const [rows, setRows] = useStore();
  const router = useRouter();

  const getRawData = async () => {
    const {
      data: rawData,
    } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/blobs`);
    rawData?.blobsRows?.forEach(function(element) {
      element.hrefNID = `/rollups/${element.nid}`;
      element.hrefBlob = `/rollups/${element.nid}/blocks/${element.height}`;
    });
    setRawData(rawData);
  };

  useEffect(() => {
    getRawData();
  }, []);

  const rows = rawData?.blobsRows?.map((element, idx) => (
    <tr key={idx}>
      <td style={{ fontSize: "14px" }}><a href={element?.hrefBlob}>{element?.blockHash?.substr(0,5)}...{element?.blockHash?.substr(element?.blockHash?.length-5,5)}</a></td>
      <td style={{ fontSize: "14px" }}><a href={element?.hrefNID}>{element?.nid}</a></td>
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
      <Divider style={{ margin: "60px 0 60px 0" }} />
    </div>
  );
};

export default Collections;
