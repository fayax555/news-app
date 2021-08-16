import { useState, FC } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import styled from 'styled-components';

const FilePondWrap = styled.div`
  min-height: 100px;
`;

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

const FilePondComponent = ({ imgUrl, files, setFiles }) => {
  // del click is only for dev to remove filepond default image when editing
  const [isDelClick, setDelClick] = useState(false);
  if (isDelClick) imgUrl = null;

  const myFiles = () => {
    if (!imgUrl) return;

    return [
      {
        source: imgUrl,
      },
    ];
  };

  return (
    <FilePondWrap>
      <FilePond
        required={true}
        onremovefile={() => {
          if (process.env.NODE_ENV === 'development') setDelClick(true);
        }}
        files={myFiles() || files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        maxFileSize='10MB'
        allowPaste={false}
        acceptedFileTypes={['image/png', 'image/jpeg', 'image/webp']}
        labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
        credits={false}
      />
    </FilePondWrap>
  );
};

export default FilePondComponent;
