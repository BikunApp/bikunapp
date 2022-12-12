import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Carousel } from "../../elements";

// context
import { useBikunContext } from "../../../provider/BikunContextProvider";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="w-full absolute -top-40"
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const CustomTabs = ({ data, isBikun }) => {

  const [value, setValue] = React.useState(0);
  const { choosenJalur, setChoosenJalur } = useBikunContext();
  const { dataBikun, setDataBikun } = useBikunContext();

  const handleChange = (event, newValue) => {

    setValue(newValue);
    setChoosenJalur(newValue);

  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        alignItems: "center",
      }}
    >
      {data?.map((panel, index) => (
        <TabPanel value={value} index={index}>
          {isBikun ? (
            <Box key={index} sx={{ p: 2 }}>
              <Carousel data={data[index]?.content} isBikun={true} />
            </Box>
          ) : (
            panel.content
          )}
        </TabPanel>
      ))}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            background: "white",
            padding: "8px",
            borderRadius: "42px",
            "& .MuiTab-root.Mui-selected": {
              color: "white",
              backgroundColor: "#5038BC",
              borderRadius: "42px",
            },
            width: "max-content",
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "transparent",
            },
          }}
        >
          {data?.map((panel, index) => (
            <Tab
              label={panel.label}
              key={index}
              {...a11yProps(index)}
              sx={{
                "&:hover": {
                  backgroundColor: "#5038BC",
                  color: "white",
                  borderRadius: "42px",
                  opacity: 1,
                },
                "&": {
                  textTransform: "capitalize",
                  color: "#5038BC",
                  fontFamily: "Poppins",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};
