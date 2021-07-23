import { FC, useState } from 'react';
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

// @ts-ignore
const FilePondComponent = ({ files, setFiles }) => {
  return (
    <FilePondWrap>
      <FilePond
        required={true}
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        maxFileSize='3MB'
        acceptedFileTypes={['image/png', 'image/jpeg']}
        labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
        // @ts-ignore
        credits={false}
      />
    </FilePondWrap>
  );
};

export default FilePondComponent;
