import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Box} from '@mui/material'
import {Videos, ChannelCard} from './'
import { fetchFromApi } from '../utils/fetchFromApi'

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] =useState([])
  const { id} = useParams()
  useEffect(()=>{
    fetchFromApi(`channels?part=snippet&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0]))

    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items))
  }, [id])
  return (
    <Box minHeight="95vh" >
      <Box>
        <div style={{
            background: 'linear-gradient(90deg, rgba(25,36,0,0.87718837535014) 0%, rgba(9,121,52,0.8183648459383753) 42%, rgba(255,0,86,0.3981967787114846) 80%)',
            zIndex: 10,
            height: '300px'
        }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px"/>
      </Box>
      <Box display="flex" p='2'>
        <Box sx={{ mr: { sx: '100px' }}} />
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail