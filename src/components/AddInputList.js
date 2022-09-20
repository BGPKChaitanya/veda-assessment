import { useState, useEffect } from "react";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import "./AddInputList.scss";
import { database } from "./Firebase";
import { setDoc, doc, getDoc } from "@firebase/firestore";

const UpButton = styled.button`
  color: ${(props) => (props.indexValue !== 0 ? "#2a42a1" : "#ffffff")};
`;

const DownButton = styled.button`
  color: ${(props) =>
    props.indexValue !== props.lengthList - 1 ? "#2a42a1" : "#ffffff"};
`;

const AddInputList = () => {
  const [text, setText] = useState("");
  const [getList, setGetList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(database, "textlist", "textData");
      const docSnap = await getDoc(docRef);
      setGetList(docSnap.data());
    };
    getData();
  }, []);

  const [list, setList] = useState(getList);
  const len_list = list.length;

  useEffect(() => {
    const updateDocList = async () => {
      await setDoc(doc(database, "textlist", "textData"), {
        ArrayOfNames: list,
      });
    };
    updateDocList();
  }, [list]);

  const AddToList = async (event) => {
    event.preventDefault();
    setList([...list, text]);
    setText("");
  };

  const swapUp = (indexValue) => {
    if (indexValue !== 0) {
      const updatedList = [...list];
      [updatedList[indexValue], updatedList[indexValue - 1]] = [
        updatedList[indexValue - 1],
        updatedList[indexValue],
      ];
      setList(updatedList);
    }
  };

  const swapDown = (indexValue) => {
    if (indexValue !== len_list - 1) {
      const updatedList = [...list];
      [updatedList[indexValue], updatedList[indexValue + 1]] = [
        updatedList[indexValue + 1],
        updatedList[indexValue],
      ];
      setList(updatedList);
    }
  };

  const deleteItem = (indexValue) => {
    const newList = list.filter((item, index) => index !== indexValue);
    setList(newList);
  };

  return (
    <>
      <ul>
        {list.map((item, index) => {
          return (
            <li className="listContainer" key={index}>
              <h1>{item}</h1>
              <div className="buttonContainer">
                <UpButton
                  className="upButton"
                  onClick={() => swapUp(index)}
                  indexValue={index}
                >
                  <VscTriangleUp />
                </UpButton>
                <DownButton
                  className="downButton"
                  onClick={() => swapDown(index)}
                  indexValue={index}
                  lengthList={len_list}
                >
                  <VscTriangleDown />
                </DownButton>
                <button className="close" onClick={() => deleteItem(index)}>
                  <AiOutlineClose />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <form className="inputContainer" onSubmit={AddToList}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button type="submit" className="addButton">
          ADD
        </button>
      </form>
    </>
  );
};

export default AddInputList;
