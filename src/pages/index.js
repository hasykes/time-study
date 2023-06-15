import Head from "next/head";
import Link from "next/link";
//import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Time-Study</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Warehouse Time-Study Tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <main>
        <Link id="induct_main_button" className="button" href="/induct">
          Induct
        </Link>

        <Link id="pick_main_button" className="button" href="/pick">
          Pick
        </Link>

        <Link id="putaway_main_button" className="button" href="/putaway">
          Putaway
        </Link>

        <Link id="custom_main_button" className="button" href="/custom">
          Custom
        </Link>
      </main>
    </>
  );
}
