import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/layout";
import { setupCrumbs } from ".";
import { getComponents } from "./utils";

const { transformPage } = require("@builtjs/theme");

const Page = ({ config }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [page, setPage] = useState({});
  const [layoutComps, setLayoutComps] = useState([]);
  const [sectionComps, setSectionComps] = useState([]);
  let [isSetUpCrumbs, setIsSetupCrumbs] = useState(false);

  useEffect(() => {
    if (!isSetUpCrumbs) {
      setupCrumbs(router);
      setIsSetupCrumbs(true);
    }
    setPage(null);
    setLayoutComps([]);
    init();
  }, [slug]);

  async function init() {
    if (!config) {
      return;
    }
    let page = await transformPage(config);
    if (!page) {
      return;
    }
    let [sectionComponents, layoutComponents] = await Promise.all([
      getComponents(page.sections),
      getComponents(page.layout.sections),
    ]);
    setPage(page);
    setSectionComps(sectionComponents);
    setLayoutComps(layoutComponents);
  }

  return (
    <>
      <Layout layoutComps={layoutComps} page={page}>
        {
          <>
            {page &&
              sectionComps.length > 0 &&
              sectionComps.map((Section, i) => {
                return (
                  page.sections[i] && (
                    <Section key={i} content={page.sections[i].content} />
                  )
                );
              })}
          </>
        }
      </Layout>
    </>
  );
};

export default Page;
