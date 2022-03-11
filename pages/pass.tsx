import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Pass.module.css';
import { connect } from 'react-redux';
import { InitialState } from '../redux/store';
import { User } from '../db/models/User';

const Pass: NextPage = (props: any) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (props.currentUser && props.currentUser._id) {
      fetch(`/api/user/pass?subjectId=${props.currentUser._id}`)
        .then((res) => res.json())
        .then((data) => {
          setPeople(data.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [props.currentUser]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Your unlike list</title>
        <meta name="description" content="See who you unliked" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {people && people.length
        ? people.map((item: User, index: any) => {
          return (
            <div key={index} className={styles.item}>
              <div
                className={styles.thumbnail}
                style={{ backgroundImage: `url(${item.picture})` }}
              ></div>
              <div className={styles.name}>
                {item.firstName} {item.lastName}
                {item.age ? `, ${item.age}` : ''}
              </div>
            </div>
          );
        })
        : null}
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(Pass);
