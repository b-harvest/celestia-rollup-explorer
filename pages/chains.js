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
    } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/chains`);
    setRawData(rawData);
  };

  useEffect(() => {
    getRawData();
  }, []);

  rawData?.chainsRows?.forEach(function(element) {
    element.hrefNID = "/rollups/" + element.nid;
  });

  const rows = rawData?.chainsRows?.map((element, idx) => (
    <tr key={idx}>
      <td style={{ fontSize: "14px" }}><a href={element?.hrefNID}>{element?.nid}</a></td>
      <td style={{ fontSize: "14px" }}>{element?.nidBase64}</td>
      <td style={{ fontSize: "14px" }}>{element?.chainId}</td>
      <td style={{ fontSize: "14px" }}>{element?.height}</td>
      <td style={{ fontSize: "14px" }}>{element?.heightCore}</td>
      <td style={{ fontSize: "14px" }}></td>
      <td style={{ fontSize: "14px" }}></td>
    </tr>
  ));

  return (
    <div>
      <Text style={{ color: "#444", fontSize: "38px", margin: "0px 0 20px 40px", fontWeight: "bold" }} align="left">
        Rollup Chains
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
              <th>Namespace ID</th>
              <th>NID base64</th>
              <th>Chain ID</th>
              <th>Height</th>
              <th>Celestia Height</th>
              <th>Total Blob #</th>
              <th>Total TX #</th>
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
