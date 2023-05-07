import axios from "axios";
import { useEffect, useState } from "react";

import { Table } from "@mantine/core";
import { SimpleGrid, Text, Divider, Transition } from "@mantine/core";
import CoreInfo from "../components/coreInfo";
import CoreTOP10TXed from "../components/coreTOP10TXed";
import CoreTOPHeight from "../components/coreTOPHeight";
import CoreNewCreated from "../components/coreNewCreated";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Caver from "caver-js";

const Main = () => {
  const [coreInfo, setCoreInfo] = useState(null);
  const [coreSummary, setCoreSummary] = useState(null);
  const [rpcBlockResult, setRpcBlockResult] = useState(null);
  
  const [ranking, setRanking] = useState(null);
  const [topUsers, setTopUsers] = useState(null);

  const getRanking = async () => {
    try {
      const {
        data: coreInfo,
      } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/core/info`);
      setCoreInfo(coreInfo);

      const {
        data: coreSummary,
      } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/core/summary`);
      setCoreSummary(coreSummary);

      const {
        data: rpcBlockResult,
      } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_CORE_RPC_URL}/block`);
      setRpcBlockResult(rpcBlockResult);
      console.log(rpcBlockResult);
      
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getRanking();
  }, []);

  return (
    <main>
      <SimpleGrid
        style={{ padding: "10px 80px" }}
        cols={1}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1160, cols: 1, spacing: "md" },
          { maxWidth: 840, cols: 1, spacing: "sm" },
        ]}
      >
        
      <CoreInfo data={coreInfo} rpc={rpcBlockResult}/>
      </SimpleGrid>
      <SimpleGrid
        style={{ padding: "10px 80px" }}
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1160, cols: 2, spacing: "md" },
          { maxWidth: 840, cols: 1, spacing: "sm" },
        ]}
      >
        <div>
          <Text style={{ color: "#444", fontSize: "24px", margin: "0px 0 20px 0px", fontWeight: "bold" }} align="left">
          Most TXed Chains
          </Text>
          <CoreTOP10TXed elements={coreSummary?.top10TXedNIDs} />
        </div>
        <div>
          <Text style={{ color: "#444", fontSize: "24px", margin: "0px 0 20px 0px", fontWeight: "bold" }} align="left">
          Most Highest Chains
          </Text>
          <CoreTOPHeight elements={coreSummary?.topHeightNIDs} />
        </div>
        <div>
          <Text style={{ color: "#444", fontSize: "24px", margin: "20px 0 20px 0px", fontWeight: "bold" }} align="left">
          New Chains
          </Text>
          <CoreNewCreated elements={coreSummary?.newCreatedNIDs} />
        </div>
      </SimpleGrid>
      <Divider style={{ margin: "60px 0 60px 0" }} />
    </main>
  );
};

export default Main;
