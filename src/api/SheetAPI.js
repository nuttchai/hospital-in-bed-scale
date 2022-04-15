import axios from "axios";

const REACT_APP_SHEET_BEST_API = process.env.REACT_APP_SHEET_BEST_API;
const TAB_PAGE = process.env.REACT_APP_TAB_PAGE;

export const FetchSheetData = async () => {
  const url = `${REACT_APP_SHEET_BEST_API}/tabs/${TAB_PAGE}`;
  const response = await axios.get(url);
  const data = response.data;
  return data;
};
