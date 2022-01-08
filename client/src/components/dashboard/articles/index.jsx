import React, { useEffect } from "react";
import AdminLayout from "../../hoc/adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { changeArticleStatus } from "../../../store/actions/article_actions";
import {
  Button,
  ButtonToolbar,
  ButtonGroup,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { getPaginateArticles } from "../../../store/actions/article_actions";

import PaginationComponent from "./paginate";

const Articles = (prop) => {
  const dispatch = useDispatch();

  const editArtsAction = (id) => {
    prop.history.push(`/dashboard/articles/${id}`);
  };

  const articles = useSelector((state) => {
    return state.articles;
  });
  let arts = articles.adminArticles;

  useEffect(() => {
    dispatch(getPaginateArticles());
  }, [dispatch]);

  const goToPrevPage = (page) => {
    dispatch(getPaginateArticles(page));
  };

  const goToNextPage = (page) => {
    dispatch(getPaginateArticles(page));
  };

  const handleStatusChange = (status, _id) => {
    let newStatus = status === "draft" ? "public" : "draft";
    dispatch(changeArticleStatus(newStatus, _id));
  };

  return (
    <AdminLayout section="Articles">
      <div className="articles_table">
        <ButtonToolbar className="mb-3">
          <ButtonGroup className="mr-2">
            <LinkContainer to="/dashboard/articles/add">
              <Button variant="secondary">Add article</Button>
            </LinkContainer>
          </ButtonGroup>
          <form
            onSubmit={() => {
              alert("search");
            }}
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="text" placeholder="Example Text"></FormControl>
            </InputGroup>
          </form>
        </ButtonToolbar>

        <PaginationComponent
          arts={arts}
          prev={(page) => goToPrevPage(page)}
          next={(page) => goToNextPage(page)}
          handleStatusChange={(status, id) => handleStatusChange(status, id)}
          editArtsAction={(id) => editArtsAction(id)}
        ></PaginationComponent>
      </div>
    </AdminLayout>
  );
};

export default Articles;
