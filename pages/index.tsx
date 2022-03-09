import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Discover.module.css'
import { getData } from './api/user/index'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { InitialState } from '../redux/store'
import Favorit from '@material-ui/icons/Favorite'
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied'
import { User } from '../db/models/User'

const Discover: NextPage = (props: any) => {

  const router = useRouter();
  const [sliderPos, setSliderPos] = useState(0);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (props.data && props.data.length) {
      let people = props.data;
      if (props.currentUser) {
        people = people.filter((item: User) => item._id !== props.currentUser._id)
      }
      setPeople(people);
    }
  }, [props.data, props.currentUser])

  const handlePass = async () => {
    let currentUser: User = props.currentUser;
    let targetUser: User = people[sliderPos];
    if (currentUser && targetUser) {
      fetch(`/api/user/pass`, {
        method: 'POST',
        body: JSON.stringify({
          subject: currentUser._id,
          target: targetUser._id
        }),
        headers: { 'Content-Type': 'application/json'}
      })
    }
    let newPos = sliderPos + 1;
    if (newPos > people.length - 1) {
      newPos = 0;
    }
    setSliderPos(newPos);
  }

  const handleLike = async () => {
    let currentUser: User = props.currentUser;
    let targetUser: User = people[sliderPos];
    if (currentUser && targetUser) {
      fetch(`/api/user/like`, {
        method: 'POST',
        body: JSON.stringify({
          subject: currentUser._id,
          target: targetUser._id
        }),
        headers: { 'Content-Type': 'application/json'}
      })
    }
    let newPos = sliderPos + 1;
    if (newPos > people.length - 1) {
      newPos = 0;
    }
    setSliderPos(newPos);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Discover new friends</title>
        <meta name="description" content="Find new friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {people && people.length ? people.map((item: User, index: any) => {
        let style;
        if (sliderPos === index) {
          style = styles.active;
        }
        if (sliderPos < index) {
          style = styles.forward;
        }
        if (sliderPos > index) {
          style = styles.backward;
        }
        return (
          <div key={index} className={[styles.item, style].join(' ')}>
            <div className={styles.image} style={{backgroundImage: `url(${item.picture})`}}></div>
            <div className={styles.info}>{item.firstName} {item.lastName}{item.age ? `, ${item.age}` : ''}</div>
          </div>
        )
      }) : null}
      <div className={styles.action}>
        <span onClick={handlePass} className={styles.pass}><SentimentDissatisfied /></span>
        <span onClick={handleLike} className={styles.like}><Favorit /></span>
      </div>
    </div>
  )
}

const mapStateToProps = (state: InitialState) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Discover)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = ctx.query.page || '1';
  const data = await getData(page as unknown as number, 15);
  return {
    props: JSON.parse(JSON.stringify(data))
  }
}