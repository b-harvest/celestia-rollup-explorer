import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { SimpleGrid, Text, Divider, Transition } from "@mantine/core";
import CoreInfo from "../components/coreInfo";
import CoreTOP10TXed from "../components/coreTOP10TXed";
import CoreTOPHeight from "../components/coreTOPHeight";
import CoreNewCreated from "../components/coreNewCreated";
import Image from "next/image";
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
      // const { data: coreInfo } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/core/info`);
      // setCoreInfo(coreInfo);

      // const { data: coreSummary } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/core/summary`);
      // setCoreSummary(coreSummary);

      // const { data: rpcBlockResult } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_CORE_RPC_URL}/block`);

      // setRpcBlockResult(rpcBlockResult);

      const URL1 = `${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/core/info`;
      const URL2 = `${process.env.NEXT_PUBLIC_SERVER_URL}/explorer/core/summary`;
      const URL3 = `${process.env.NEXT_PUBLIC_SERVER_CORE_RPC_URL}/block`;

      const promise1 = axios.get(URL1);
      const promise2 = axios.get(URL2);
      const promise3 = axios.get(URL3);

      Promise.all([promise1, promise2, promise3]).then(function (values) {
        setCoreInfo(values[0].data);
        setCoreSummary(values[1].data);
        setRpcBlockResult(values[2].data);
      });

      console.log(rpcBlockResult);
    } catch (e) {
      alert("server query error");
      console.log(e);
    }
  };
  useEffect(() => {
    getRanking();
  }, []);

  return rpcBlockResult ? (
    <main>
      <SimpleGrid
        style={{ padding: "30px 12px" }}
        cols={1}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1024, cols: 1, spacing: "md" },
          { maxWidth: 840, cols: 1, spacing: "sm" },
        ]}
      >
        <CoreInfo data={coreInfo} rpc={rpcBlockResult} />
      </SimpleGrid>
      <SimpleGrid
        style={{ padding: "10px 12px" }}
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1024, cols: 1, spacing: "md" },
          { maxWidth: 840, cols: 1, spacing: "sm" },
        ]}
      >
        {/* <div className="card-wrraper"> */}
          <div className="basic-card">
            <Text className="card-title" align="left">
              🔥 Most TX Chains
            </Text>
            <CoreTOP10TXed elements={coreSummary?.top10TXedNIDs} />
          </div>
          <div className="basic-card">
            <Text className="card-title" align="left">
              ⛰ Highest Chains
            </Text>
            <CoreTOPHeight elements={coreSummary?.topHeightNIDs} />
          </div>
          <div className="basic-card">
            <Text className="card-title" align="left">
              🚀 New Chains
            </Text>
            <CoreNewCreated elements={coreSummary?.newCreatedNIDs} />
          </div>
        {/* </div> */}
      </SimpleGrid>
      {/* <Divider style={{ margin: "60px 0 60px 0" }} /> */}
    </main>
  ) : (
    <main className="loading">
      <img src="https://celestia.org/static/home-hero-image-a13233e4c024277a50abe3188f975373.svg" />
    </main>
  );
};

export default Main;
