import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Like.module.css'
import { GetResponse, PostResponse, getFancy, addFancy } from './api/user/like'
import { connect } from 'react-redux'
import { InitialState } from '../redux/store'
import { useEffect, useState } from 'react'
import { User } from '../db/models/User'

const Like: NextPage = (props: any) => {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        if (props.currentUser && props.currentUser._id) {
            fetch(`/api/user/like?subjectId=${props.currentUser._id}`)
                .then(res => res.json())
                .then(data => {
                    setPeople(data.data)
                })
                .catch(err => {
                    alert(err.message)
                })
        }
    }, [props.currentUser])

    return (
        <div className={styles.container}>
            <Head>
                <title>Your fancy list</title>
                <meta name="description" content="People that you like" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {people && people.length ? people.map((item: User, index: any) => {
                return (
                    <div key={index} className={styles.item}>
                        <div className={styles.thumbnail} style={{backgroundImage: `url(${item.picture})`}}></div>
                        <span className={styles.name}>{item.firstName} {item.lastName}{item.age ? `, ${item.age}` : ''}</span>
                    </div>
                )
            }) : null}
        </div>
    )
}

const mapStateToProps = (state: InitialState) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Like)