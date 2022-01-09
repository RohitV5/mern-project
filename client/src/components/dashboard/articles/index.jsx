import React, { useEffect, useState } from "react";
import AdminLayout from "../../hoc/adminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  changeArticleStatus,
  deleteArticle,
  getPaginateArticles,
} from "../../../store/actions/article_actions";
import {
  Modal,
  Button,
  ButtonToolbar,
  ButtonGroup,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PaginationComponent from "./paginate";

const Articles = (prop) => {
  const dispatch = useDispatch();

  const [removeAlert, setRemoveAlert] = useState(false);
  const [toRemove, setToRemove] = useState();

  const handleClose = () => setRemoveAlert(false);
  const handleShow = (id = null) => {
    console.log(id);
    setToRemove(id);
    setRemoveAlert(true);
  };

  const editArtsAction = (id) => {
    prop.history.push(`/dashboard/articles/${id}`);
  };

  const articles = useSelector((state) => {
    return state.articles;
  });

  const notifications = useSelector((state) => {
    return state.notifications;
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

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteArticle(id));
  };

  useEffect(() => {
    handleClose();
    if (notifications && notifications.deleteArticle) {
      console.log("fetching arts");
      dispatch(getPaginateArticles(arts.page));
    }
  }, [dispatch, notifications, arts]);

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
          handleShow={(id) => handleShow(id)}
        ></PaginationComponent>

        <Modal show={removeAlert} onHide={() => handleClose()}>
          <Modal.Header>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Confirm Delete</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button variant="danger" onClick={() => handleDelete(toRemove)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Articles;
