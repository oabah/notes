import { CreateNote, NavBar, NoteUICollection, UpdateNote } from './ui-components'
import { useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { DataStore } from 'aws-amplify'

function App ({ signout }) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [updateNote, setUpdateNote] = useState()

  return (
    <>
      <NavBar
        marginBottom='20px' width='100%'
        overrides={{
          Button31502513: { onClick: () => setShowCreateModal(true) },
          Button31502517: {
            onClick: async () => {
              await DataStore.clear()
              signout()
            }
          }
        }}
      />
      <div className='container'>
        <NoteUICollection overrides={({ item, idx }) => {
          return {
            overrides: {
              Vector31472464: {
                as: 'button',
                onClick: () => {
                  setShowUpdateModal(true)
                  setUpdateNote(item)
                }
              }
            }
          }
        }}
        />  
      </div>
      <div className='modal' style={{dispay: showCreateModal === false && 'none'}} >
        <CreateNote overrides={{
          MyIcon: {
            as: 'button',
            onClick: () => setShowCreateModal(false)
          }
        }}/>
      </div>
      <div className='modal' style={{display: showUpdateModal === false && 'none'}}>
        <UpdateNote
          note={updateNote} overrides={{
            MyIcon: {
              as: 'button',
              onClick: () => setShowUpdateModal(false)
            }
          }}
        />
      </div>
    </>
  )
}

export default withAuthenticator(App);