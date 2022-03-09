import { NextComponentType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import styles from '../styles/component/Navbar.module.css';
import { connect } from 'react-redux'
import { InitialState } from '../redux/store';
import Links from './StaticLink';

const Navbar: NextComponentType = (props: any) => {
    let router = useRouter();
    useEffect(() => {
        let currentUserId = localStorage.getItem('currentUserId');
        if (!currentUserId) {
            fetch('/api/user')
                .then(res => res.json())
                .then(data => {
                    if (data && data.data && data.data.length) {
                        let index = Math.floor(Math.random() * (data.data.length - 1));
                        let currentUser = data.data[index];
                        localStorage.setItem('currentUserId', currentUser._id);
                        return props.dispatch({
                            type: 'UPDATE_USER',
                            payload: currentUser
                        })
                    }
                    return alert('There are no user in database')
                })
                .catch(err => {
                    alert(err.message);
                })
        } else {
            fetch(`/api/user/${currentUserId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.user) {
                        return props.dispatch({
                            type: 'UPDATE_USER',
                            payload: data.user
                        })
                    }
                    throw new Error('User not found')
                })
                .catch(err => {
                    localStorage.setItem('currentUserId', '');
                    location.reload();
                })
        }
    }, [])

    return (
        <div className={styles.navWrapper}>
            {Links.map((item, index) => {
                let isActive = router.pathname === item.href;
                return (
                    <Link key={index} href={item.href}>
                        <a className={[styles.navItem, isActive ? styles.active : ''].join(' ')}>{item.label}</a>
                    </Link>
                )
            })}
        </div>
    )
}

function mapStateToProps(state: InitialState): InitialState {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Navbar)