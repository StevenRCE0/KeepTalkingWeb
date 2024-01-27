'use client'

import { firestore as firestoreDatabase } from '@/work/firebase'
import { collection, addDoc, getDoc, doc, setDoc } from 'firebase/firestore'
import styles from './page.module.css'
import { useState, useCallback } from 'react'
import { peerConnection } from '@/work/peerConnection'

export default function Home() {
    const [myID, setMyID] = useState('')

    const handleSignal = useCallback(async () => {
        const signalDoc = doc(collection(firestoreDatabase, 'signals'))
        const offerCandidates = collection(signalDoc, 'offerCandidates')
        const answerCandidates = collection(signalDoc, 'answerCandidates')

        const offerDescription = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offerDescription)

        setMyID(signalDoc.id)

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        }

        setDoc(signalDoc, { offer })

    }, [])

    return (
        <main className={styles.main}>
            <h1>My ID: {myID}</h1>
            <button onClick={() => handleSignal()}>Signal</button>
        </main>
    )
}
