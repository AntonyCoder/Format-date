import './App.css'
import React, {useState} from 'react';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale('ru');

function formatDate(Component){
  return function WrappedComponent(props){
    const date = dayjs(props.date);
    const now = dayjs();

    const diffMinutes = now.diff(date, 'minute');
    const diffHours = now.diff(date, 'hour');
    const diffDays = now.diff(date, 'day');

    let displayDate;

    if(diffMinutes < 60) {
      displayDate = `${diffMinutes} минут назад`
    } else if(diffHours < 24) {
      displayDate = `${diffHours} часов назад`
    } else {
      displayDate = `${diffDays} дней назад`
    }

    return <Component {...props} date={displayDate}/>
  }
}


function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

const DateTimePretty = formatDate(DateTime)

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2025-09-22 21:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2025-09-22 11:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2025-09-12 11:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2025-08-22 11:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}