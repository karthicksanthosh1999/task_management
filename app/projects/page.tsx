'use client';
import { useState } from 'react'
import ProjectForm from './_components/projectForm'
import ProjectHeader from './_components/ProjectHeader'

const page = () => {

    const [projectFormOpen, setProjectFormOpen] = useState(false)

    return (
        <>
            <ProjectHeader setOpen={setProjectFormOpen} />
            <ProjectForm open={projectFormOpen} setOpen={setProjectFormOpen} />
        </>
    )
}

export default page
