import { useState, useEffect } from "react";
import {
  ActionIcon,
  AppShell,
  Badge,
  Burger,
  Button,
  Header,
  MediaQuery,
  Menu,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import { Input } from "@mantine/core";
import Link from "next/link";
import styled from "styled-components";
import { useStore } from "../utils/store";
import axios from "axios";
import Web3 from "web3";
import { useInputState } from "@mantine/hooks";
import { useRouter } from "next/router";
import { compressAddress } from "../utils";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import caver from "caver-js";

const CText = styled(Text)`
  && {
    margin: 0 20px;
    cursor: pointer;
  }
`;

const CButton = styled(Button)`
  margin-bottom: 10px;
`;

const CHeader = styled.div`
  && * {
    font-size: 22px;
  }
`;

const Layout = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [account, setAccount] = useStore((state) => [state.account, state.setAccount]);
  const setUser = useStore((state) => state.setUser);
  const [search, setSearch] = useInputState("");
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(0);
  const theme = useMantineTheme();
  const [setWallet, setNetworkId] = useStore((state) => [state.setWallet, state.setNetworkId]);
  useEffect(() => {
    const onScroll = (e) => {
      setIsScrolled(Number(e.target.documentElement.scrollTop));
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AppShell
      padding={{ sm: 0 }}
      style={{
        paddingRight: "calc(0px + 16px)",
        backgroundImage: `url('https://celestia.org/static/header-bg-861e0242f0c2149da928dd01d1c3a486.png') `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "140% 520px",

        margin: "0px 0px 0px 0px",
        padding: "100px 0px 0px 0px",
      }}
      // https://celestia.org/static/header-bg-861e0242f0c2149da928dd01d1c3a486.png
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Navbar
            style={{
              marginTop: "70px",
            }}
            padding="md"
            // Breakpoint at which navbar will be hidden if hidden prop is true
            hiddenBreakpoint="sm"
            // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
            hidden={!opened}
            // when viewport size is less than theme.breakpoints.sm navbar width is 100%
            // viewport size > theme.breakpoints.sm – width is 200px
            // viewport size > theme.breakpoints.lg – width is 300px
            // width={{ sm: 200, lg: 300 }}
            width={{ sm: 300, lg: 400 }}
          >
            <CButton variant="white" onClick={() => setOpened(!opened)}>
              <Link href="/" passHref>
                <CText>Home</CText>
              </Link>
            </CButton>
            <CButton variant="white" onClick={() => setOpened(!opened)}>
              <Link href="/chains" passHref>
                <CText>Rollups</CText>
              </Link>
            </CButton>
            <CButton variant="white" onClick={() => setOpened(!opened)}>
              <Link href="/blocks" passHref>
                <CText>Blocks</CText>
              </Link>
            </CButton>
            <CButton variant="white" onClick={() => setOpened(!opened)}>
              <Link href="/blobs" passHref>
                <CText>Blobs</CText>
              </Link>
            </CButton>
          </Navbar>
        </MediaQuery>
      }
      header={
        <Header
          height={80}
          padding="md"
          className={`header ${isScrolled > 15 ? " header-scrolled header-box-shadow" : "header-not-scrolled "} `}
        >
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              margin: "0 auto",
              maxWidth: "1024px",
            }}
          >
            <div style={{ display: "flex" }}>
              <MediaQuery largerThan="sm" styles={{ display: "none !important;" }}>
                <div style={{ display: "flex", width: "calc(100vw - 32px)", justifyContent: "space-between" }}>
                  <Burger
                    style={{ alignSelf: "center", backgroundColor: "black" }}
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={"white"}
                  />
                  <div
                    style={{ filter: "brightness(0%)", display: "flex", alignItems: "center" }}
                    className="nav-icon-invert"
                  >
                    <img
                      className={`${isScrolled > 15 ? "nav-logo-scrolled" : "nav-logo"}`}
                      style={{ transition: "all 0.3s", width: "52px" }}
                      src="/images/celestia/icon-purple.png"
                      alt=""
                    />
                    <div
                      className="font-dosis"
                      style={{ letterSpacing: "2px", marginLeft: "4px", fontWeight: "700", fontSize: "18px" }}
                    >
                      ROLLUP EXPLORER
                    </div>
                  </div>
                  <div style={{ width: "28px" }}></div>
                </div>
              </MediaQuery>

              <MediaQuery smallerThan="sm" styles={{ display: "none !important" }}>
                <div style={{ display: "flex", cursor: "pointer" }}>
                  <div
                    className="nav-icon-invert"
                    style={{ filter: "brightness(0%)", display: "flex", alignItems: "center" }}
                  >
                    <img
                      className={`${isScrolled > 15 ? "nav-logo-scrolled" : "nav-logo"}`}
                      style={{ transition: "all 0.3s" }}
                      src="/images/celestia/icon-purple.png"
                      alt=""
                    />
                  </div>
                  <Link href="/" passHref>
                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                        transition: "all 0.3s",
                        marginLeft: "10px",
                        alignSelf: "center",
                      }}
                      className={`font-dosis ${isScrolled > 15 ? "nav-title-scrolled" : "nav-title"}`}
                    >
                      CELESTIA ROLLUP EXPLORER
                    </Text>
                  </Link>
                </div>
              </MediaQuery>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              {/* <Input
                value={search}
                onChange={setSearch}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    //router.push(`/explore-collections?search=${search}`);
                    setSearch("");
                    router.push(`/`);
                  }
                }}
                style={{ marginRight: "20px", width: "300px" }}
                variant="default"
                placeholder="Search function is not enabled"
              /> */}
              <MediaQuery smallerThan="sm" styles={{ display: "none !important" }}>
                <CHeader style={{ display: "flex" }}>
                  <Link href="/" passHref>
                    <CText
                      className={`${
                        router.pathname == "/" ? "nav-active font-dosis nav-link" : "font-dosis nav-link"
                      } ${isScrolled > 15 ? "nav-link-scrolled" : "nav-link"}`}
                    >
                      Overview
                    </CText>
                  </Link>
                  <Link href="/chains" passHref>
                    <CText
                      className={`${
                        router.pathname == "/chains" ? "nav-active font-dosis nav-link" : "font-dosis nav-link"
                      } ${isScrolled > 15 ? "nav-link-scrolled" : "nav-link"}`}
                    >
                      Rollups
                    </CText>
                  </Link>
                  <Link href="/blocks" passHref>
                    <CText
                      className={`${
                        router.pathname == "/blocks" ? "nav-active font-dosis nav-link" : "font-dosis nav-link"
                      } ${isScrolled > 15 ? "nav-link-scrolled" : "nav-link"}`}
                    >
                      Blocks
                    </CText>
                  </Link>
                  <Link href="/blobs" passHref>
                    <CText
                      className={`${
                        router.pathname == "/blobs" ? "nav-active font-dosis nav-link" : "font-dosis nav-link"
                      } ${isScrolled > 15 ? "nav-link-scrolled" : "nav-link"}`}
                    >
                      Blobs
                    </CText>
                  </Link>
                </CHeader>
              </MediaQuery>
            </div>
          </div>
        </Header>
      }
    >
      <Text style={{ maxWidth: "1024px", margin: "0 auto", paddingLeft: "0px" }}>{children}</Text>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div sytle={{ display: "flex", justifyItems: "center" }}>
          <div
            className="font-dosis footer-gradient"
            style={{
              color: "black",
              fontSize: "18px",
              // background:
              //   "linear-gradient(90deg, rgba(83,37,119,1) 0%, rgba(139,32,218,1) 49%, rgba(123,43,249,1) 100%)",
              color: "#fff",

              display: "flex",
              justifyContent: "center",

              alignItems: "center",
              padding: "8px 24px",
              paddingTop: "420px",
              fontSize: "14px",
              letterSpacing: "2px",
              color: "#fff",
            }}
          >
            <div className="" style={{ marginRight: "8px", fontWeight: "700" }}>
              This website is maintained by
            </div>
            <img width="80" height="18" src="/images/b-harvest.png" alt="" />
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Layout;
