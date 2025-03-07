"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MemberProps } from "@/db/schemas/members";
import { membershipStatusProps } from "@/db/schemas/membershipStatus";
import { useState } from "react";
import { Typography } from "@mui/material";
import CoreInfoTab from "@components/membersUI/CoreInfoTab";
import { scriptProps } from "@/db/schemas/scripts";
import MottoTab from "@components/membersUI/MottoTab";
import { mottoProps } from "@/db/schemas/mottos";
import { biographyProps } from "@/db/schemas/biographies";
import BiographyTab from "@components/membersUI/BiographyTab";
import {DndContext} from '@dnd-kit/core';
import ImageUploader from "./ImageUploader";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MemberTabs({
  coreInfo,
  membershipStatus,
  scripts,
  mottos,
  biography,
}: {
  coreInfo: MemberProps | null;
  membershipStatus: membershipStatusProps[];
  scripts: scriptProps[] | null;
  mottos: mottoProps[] | null;
  biography: biographyProps[] | null;
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const coreInfoHeader = coreInfo
    ? `${coreInfo?.name} ${coreInfo?.surname}`
    : `Nov član`;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Tab label={coreInfoHeader} {...a11yProps(0)} />
          <Tab label="Moto" {...a11yProps(1)} disabled={!coreInfo} />
          <Tab label="Biografija" {...a11yProps(2)} disabled={!coreInfo} />
          <Tab label="Profilna" {...a11yProps(3)} disabled={!coreInfo} />
          <Tab
            label="Vidljivost na sajtu"
            {...a11yProps(4)}
            disabled={!coreInfo}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CoreInfoTab coreInfo={coreInfo} membershipStatus={membershipStatus} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {scripts && mottos && <MottoTab scripts={scripts} motto={mottos} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {scripts && biography && (
          <DndContext> <BiographyTab scripts={scripts} biography={biography}></BiographyTab></DndContext>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ImageUploader aspectRatio={5/7} destination={new URL("https://t.com")} src="https://teatar011.com//assets/img/let-iznad-kukavicjeg-gnezda/poster.png"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Vidljivost na sajtu....
      </CustomTabPanel>
    </Box>
  );
}
