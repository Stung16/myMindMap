import { LuUpload } from "react-icons/lu"
import { memo, useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

const UploadImage = ({ userInfo, onFiles, files }) => {
    const [rejected, setRejected] = useState([])
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        onFiles(() => [
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ])
        setRejected([])
      }
  
      if (rejectedFiles?.length) {
        setRejected(rejectedFiles)
      }
    }, [])
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        "image/*": [],
      },
      maxSize: 1024 * 1000 * 5, //limit 5MB
      onDrop,
    })
    useEffect(() => {
      // Revoke the data uris to avoid memory leaks
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
    }, [files])
  return (
    <div className="flex flex-col-reverse items-center">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="mt-3 text-center cursor-pointer">
          <LuUpload fontSize="1.8rem" color="gray" />
        </div>
      </div>
      {/* Preview */}
      <section className="flex flex-col items-center">
        <p className="text-danger">
          {rejected.length ? "Cannot upload photos larger than 5MB " : ""}
        </p>
        <div
          className={`relative p-3 border border-solid rounded-full  w-36 h-36 ${
            rejected.length ? "border-danger" : "border-blue1"
          }`}
        >
          <img
            src={
              files.length
                ? files[0].preview
                : userInfo?.avatar || "/img/fallback-avt.jpg"
            }
            alt={files[0]?.name}
            width={100}
            height={100}
            onLoad={() => {
              URL.revokeObjectURL(files[0]?.preview)
            }}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
      </section>
    </div>
  )
}

export default memo(UploadImage)