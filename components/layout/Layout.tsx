import { ReactNode } from "react";

import Head from "next/head";
// import styles from "./layout.module.css";
import { Menu, Container, Dropdown, Header } from "semantic-ui-react";

interface LayoutProps {
  children: ReactNode;
  title: string;
  metaData?: {
    title?: string;
    description?: string;
  };
}

export default function Layout({ children, title, metaData }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{metaData?.title || "Six Degrees Challenge"}</title>
        <meta
          name="description"
          content={
            metaData?.description ||
            "See if you can stack up to your friends in this fun game based on the classic Hollywood game."
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menu fixed="top">
          <Container>
            <Menu.Item header>
              <Header as="h1">Six Degrees Challenge</Header>
            </Menu.Item>
            <Menu.Item as="a">Home</Menu.Item>
          </Container>
        </Menu>
        <Container style={{ paddingTop: "5em", paddingBottom: "3em" }}>
          <Header as="h2">{title}</Header>
          {children}
        </Container>
      </main>
      <footer>
        <Menu fixed="bottom">
          <Container>
            <Menu.Item header>A Josh Glazer Project</Menu.Item>
          </Container>
        </Menu>
      </footer>
    </>
  );
}
