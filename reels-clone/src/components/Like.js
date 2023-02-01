import React, {useState, useEffect} from 'react'

const Like = ({userData, postData}) => {
    const [like, setLike] = useState(null)
    useEffect(() => {
        let check = postData.likes.includes(userData.userId)?true:false
        setLike(check)
    }, [postData])
  return (
    <div>

    </div>
  )
}

export default Like