import * as Dialog from '@radix-ui/react-dialog'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { X } from 'lucide-react'

interface NoteCardProps {
    note: {
        date: Date;
        content: string;
    }
}

export function NoteCard({ note }: NoteCardProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md text-left bg-slate-800 p-5 flex flex-col gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='text-sm font-medium text-slate-300'>
                    {note.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                
                <p className='text-sm leading-6 text-slate-400 text-justify'>
                    {note.content}
                </p>

                <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/60' />

                <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] max-w-[640px] w-full bg-slate-700 flex flex-col flex-direction rounded-md outline-none'>
                    <Dialog.Close className='absolute top-5 right-5 p-1 rounded-full bg-slate-800 hover:bg-slate-900'>
                        <X size={20} />
                    </Dialog.Close>
                    
                    <div className='flex flex-1 flex-col gap-3 p-5'>
                        <span className='text-sm font-medium text-slate-300'>
                            {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
                        </span>
                        
                        <p className='text-sm leading-6 text-slate-400 text-justify'>
                            {note.content}
                        </p>

                    </div>
                    
                    <button 
                        type='button'
                        className='w-full py-4 bg-slate-800 text-slate-300 text-sm text-center font-medium group'    
                    >
                        Deseja <span className='text-red-400 group-hover:underline'>apagar</span> essa nota?
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}