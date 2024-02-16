import { useState } from 'react'
import logo from './assets/logo-nlw.svg'
import { toast } from 'sonner'

import { AddNoteCard } from './components/add-note-card'
import { NoteCard } from './components/note-card'

interface Note {
    id: string,
    date: Date,
    content: string
}

export function App() {
    const [search, setSearch] = useState('')
    const [notes, setNotes] = useState<Note[]>(() => {
        const notes = localStorage.getItem('@nlw/notes')

        if (notes) {
            return JSON.parse(notes)
        }

        return []
    })

    const createNote = ((content: string) => {
        const newNote = {
            id: crypto.randomUUID(),
            date: new Date(),
            content
        }
        
        const notesArray = [newNote, ...notes]
        setNotes(notesArray)

        localStorage.setItem('@nlw/notes', JSON.stringify(notesArray))
    })

    const editNote = ((id: string, content: string) => {
        const notesArray = notes.map(note => {
            if (note.id === id) {
                note.content = content
            }

            return note
        })

        setNotes(notesArray)
        localStorage.setItem('@nlw/notes', JSON.stringify(notesArray))
    })

    const deleteNote = ((id: string) => {
        const notesArray = notes.filter(note => {
            return note.id !== id
        })

        setNotes(notesArray)
        localStorage.setItem('@nlw/notes', JSON.stringify(notesArray))
        
        toast.success('Nota excluída com sucesso')
    })

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const filteredNotes = search !== ''
        ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        : notes

    return (
        <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
            <img src={logo} alt="logo" />

            <form className='w-full'>
                <input
                    type="text"
                    placeholder='Busque suas notas...'
                    className='w-full bg-transparent text-2xl font-semibold tracking-tight outline-none placeholder:text-slate-500 md:text-3xl' 
                    onChange={handleSearchChange}
                />
            </form>

            <div className="h-px bg-slate-700" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                <AddNoteCard createNote={createNote} />

                {filteredNotes.map(note => (
                    <NoteCard 
                        key={note.id}
                        note={note} 
                        deleteNote={deleteNote}
                        editNote={editNote}    
                    />
                ))}
            </div>
        </div>
    )
}
