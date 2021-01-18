import React, { FC, useState } from "react"
import { Alert, Icon, IconButton } from "rsuite"
import Confirm from "../../component/common/Confirm"
import { requestDeleteArticle } from "../../apis/ArticleApi"


interface Props {
  articleID: number
}

const ArticleDeleteButton: FC<Props> = ({articleID}) => {
  const [deleteFetching, setDeleteFetching] = useState(false)
  const [deleteConfirmShow, setDeleteConfirmShow] = useState(false)

  const onDelete = () => {
    setDeleteFetching(true)
    requestDeleteArticle(articleID)
      .then(() => window.location.href = '/')
      .finally(() => setDeleteFetching(false))
      .catch(err => Alert.error(err.toString()))
  }

  return (
    <>
      <IconButton
        loading={deleteFetching}
        icon={<Icon icon="trash"/>}
        onClick={() => setDeleteConfirmShow(true)}
        size="xs"
      />
      <Confirm
        show={deleteConfirmShow}
        onOK={onDelete}
        onClose={() => setDeleteConfirmShow(false)}
      >
        DELETE?
      </Confirm>
    </>
  )
}

export default ArticleDeleteButton