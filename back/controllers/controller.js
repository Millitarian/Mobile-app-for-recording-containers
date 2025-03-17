import asyncHandler from 'express-async-handler';
import {container, component} from '../models/Models.js'

const getAllContainer = asyncHandler(async (req, res) => {
    const containers = await container.find({}).exec()
    res.json(containers || [])
})

const getContainerById = asyncHandler(async (req, res) => {
    const con = await container.findById(req.params.id).exec()
    console.log(con)
    res.json(con)
})
//|| [{_id: 'error', name: 'container не найден'}]

const addNewContainer = asyncHandler(async (req, res) => {
    const newContainerName = req.body.newContainerName
    console.log(newContainerName)

    const newContainer = new container({name: newContainerName})

    const createdContainer = await newContainer.save()
    res.json(createdContainer)
})

const getContainerComponent = asyncHandler(async (req, res) => {
    const containerId = await req.params.id
    console.log(containerId)
    const components = await component.find({containerId: containerId}).exec()

    console.log(components)
    res.json(components || [])
})

const addNewComponent = asyncHandler(async (req, res) => {
    const containerId = req.body.containerId
    const newComponentName = req.body.newName
    const newComponentCount = req.body.newCount

    console.log(newComponentName, newComponentCount)

    const newComponent = new component({containerId: containerId, name: newComponentName, count: newComponentCount})

    const createdComponent = await newComponent.save()
    res.json(createdComponent)
})

const searchContainer = asyncHandler(async (req, res) => {
    const componentName = req.params.name
    const components = await component.find({name: componentName}).exec()
    const containersList = await getConteinerByComponent(components)
    console.log("->",containersList)
    res.json(containersList || [])
})

const getConteinerByComponent = async (components) => {
    if (components.length > 1) {
        const sdata = JSON.stringify({components})
        const data = JSON.parse(sdata)
        const containersList = await getAllConteinerByComponent(data);
        return containersList
    } else if (components.length == 1){
        const con = await container.findById(components[0].containerId).exec()
        return [con]
    }
}

const getAllConteinerByComponent = (data) => {
    const containersList = [];
    data.components.forEach(async (element) => {
        const con = await container.findById(element.containerId).exec()
        containersList.push(con)
        })
    return containersList
}


export {getAllContainer, addNewContainer, getContainerComponent, addNewComponent, getContainerById, searchContainer}