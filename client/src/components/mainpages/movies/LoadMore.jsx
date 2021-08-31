import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { GlobalState } from "../../../GlobalState";

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.moviesAPI.page;
  const [result] = state.moviesAPI.result;

  return (
    <div className='load_more'>
      {result < page * 9 ? (
        ""
      ) : (
        <Button color='primary' onClick={() => setPage(page + 1)}>
          Load more{" "}
        </Button>
      )}
    </div>
  );
}

export default LoadMore;
