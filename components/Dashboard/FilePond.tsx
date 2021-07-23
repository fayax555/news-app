// @ts-nocheck
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
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

const FilePondComponent = ({ files, setFiles }) => {
  return (
    <FilePondWrap>
      <FilePond
        required={true}
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        credits={false}
      />
    </FilePondWrap>
  );
};

export default FilePondComponent;
