import logo from './logo.svg';
import './App.css';
import Todo from "./Todo";
import {useEffect, useState} from "react";
import {Container, List, Paper, AppBar, Toolbar, Grid, Typography, Button} from "@mui/material";
import AddTodo from "./AddTodo";
import axios from 'axios';
import instance, {signout} from "./Interceptor/axiosInterceptor";

function App() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {

        instance.get('/todo')
            .then(response => {
                // console.log(response);
                setItems(response.data.data)
                setLoading(false);
            })
            .catch(error => {
                // console.log(error.data)
                // if (error.response.status === 403) {
                //     window.location.replace("/login");
                // }
            });


    }, [])

    const editItem = (item) => {
        instance.put('/todo', item)
            .then((response) => setItems(response.data.data));
    }

    const addItem = (item) => {
        instance.post('/todo', item)
            .then((response) => {
                console.log(response);
                setItems(response.data.data)
            })
            .catch(error => {
                console.log(error);
            });

        // item.id = "ID-" + items.length; // key 를 위한 id
        // item.done = false; // done 초기화
        // // 업데이트는 반드시 setItems 로 하고 새 배열을 만들어야한다.
        // setItems([...items, item]);
        // console.log("items : " , items);
    }

    const deleteItem = (item) => {
        instance.delete('/todo', {
            data : item
        })
            .then((response) => setItems(response.data.data));
        // // 삭제할 아이템을 찾는다.
        // const newItems = items.filter( e => e.id !== item.id);
        //
        // // 삭제할 아이템을 제외한 아이템을 다시 배열에 저장
        // setItems([...newItems]);
    }

    // let todoItems = items.length > 0 && items.map((item) => <Todo item={item} key={item.id}/>);

    let todoItems = items.length > 0 && (
        <Paper style={{margin : 16}}>
            <List>
                {items.map((item) => (
                    <Todo
                        item={item}
                        key={item.id}
                        editItem={editItem}
                        deleteItem={deleteItem}
                    />
                ))}
            </List>
        </Paper>
    );

    useEffect(() => {
        console.log(items)
    }, [items]);

    const signout = () => {
        localStorage.setItem("ACCESS_TOKEN", null);
        window.location.href = "/login";
    }

    // navigationBar 추가
    let navigationBar = (
        <AppBar position="static">
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item xs={9} md={9} item style={{paddingRight: 50}} >
                        <Typography variant="h6" style={{}}>오늘의 할일</Typography>
                    </Grid>
                    <Grid>
                        <Button color="inherit" onClick={signout} style={{right:50}}>
                            로그아웃
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );

    // 로딩중이 아닐 때 렌더링할 부분, 글리치 해결 부분
    let todoListPage = (
        <div>
            {navigationBar}
            <Container maxWidth={"md"}>
                <AddTodo addItem={addItem} />
                <div className={"TodoList"}> {todoItems} </div>
            </Container>
        </div>

    );

    let loadingPage = <h1> 로딩중 .. </h1>;
    let content = loadingPage;

    if (!loading) {
        content = todoListPage;
    }

    return (
        <div className="App">
            {content}
        </div>
    );
}

export default App;
