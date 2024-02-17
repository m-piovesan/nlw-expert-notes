import * as Dialog from '@radix-ui/react-dialog'

import { formatDistanceToNow, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { X, Pencil } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner';

interface NoteCardProps {
    note: {
        id: string;
        date: Date;
        content: string;
    },
    deleteNote: (id: string) => void,
    editNote: (id: string, content: string) => void;
}

export function NoteCard({ note, deleteNote, editNote }: NoteCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [content, setContent] = useState(note.content)

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)
    }

    const handleSaveNote = () => {
        if (content === '') {
            toast.error('Você não pode salvar uma nota vazia')
            return
        }

        editNote(note.id, content)
        setIsEditing(false)
    } 

    return (
        <Dialog.Root>
            <Dialog.Trigger className='relative rounded-md hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:w-full'>
                <div className='h-full w-full rounded-md bg-slate-800 flex'>
                    <div className='text-sm rounded-md text-left p-5 flex flex-col gap-3 overflow-y-auto no-scrollbar'>
                        <span className='font-medium text-slate-300'>
                            {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
                        </span>
                        
                        <p className='leading-6 text-slate-400 text-justify'>
                            {note.content}
                        </p>
                    </div>    
                </div>

                <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-black/0 rounded-md pointer-events-none'/>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/60'/>

                <Dialog.Content
                    className='fixed inset-0 overflow-hidden w-full bg-slate-700 flex flex-col flex-direction outline-none
                        md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-[60vh] md:max-w-[640px] md:rounded-md md:inset-auto'
                    >
                    <Dialog.Close 
                        className='absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 hover:bg-slate-900'
                        onClick={() => setIsEditing(false)}
                    >
                        <X size={16} />
                    </Dialog.Close>
                    
                    {isEditing ? (
                        <span
                            onClick={() => setIsEditing(!isEditing)} 
                            className='absolute top-5 right-14 p-1.5 rounded-full bg-lime-400 animate-bounce hover:bg-lime-900'
                        >
                            <Pencil size={16} color='black'/>
                        </span>
                    ) : (
                        <span
                            onClick={() => setIsEditing(!isEditing)} 
                            className='absolute top-5 right-14 p-1.5 rounded-full bg-slate-800 hover:bg-slate-900'
                        >
                            <Pencil size={16} />
                        </span>
                    )}
                    
                    <div className='flex flex-1 flex-col gap-3 p-5'>
                        <span className='text-sm font-medium text-slate-300'>
                            {format(note.date, 'PPPp', { locale: ptBR })}                        
                        </span>
                        
                        {isEditing ? (
                            <textarea
                                defaultValue={note.content}
                                onChange={handleContentChange}
                                className='text-sm leading-6 bg-transparent resize-none outline-none text-slate-400 text-justify'
                            />
                        ) : (
                            <p className='text-sm leading-6 text-slate-400 text-justify'>
                                {note.content}
                            </p>
                        )}

                    </div>
                    
                    <button 
                        type='button'
                        className='w-full py-4 bg-slate-800 text-slate-300 text-sm text-center font-medium group'    
                    >
                        Deseja 
                        {isEditing ? (
                            <span onClick={() => handleSaveNote()} className='text-lime-400 group-hover:underline'> atualizar </span>
                        ) : (
                            <span onClick={() => deleteNote(note.id)} className='text-red-400 group-hover:underline'> apagar </span>
                        )}
                        essa nota?
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}