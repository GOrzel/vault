package com.vault.vault.logic.controllers;

import com.vault.vault.logic.presentations.FilePresentation;
import com.vault.vault.logic.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by User on 2018-11-02.
 */
@CrossOrigin
@RestController
@RequestMapping("/rest/file")
public class FileController {

    private FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<FilePresentation> getAllFiles() {
        return fileService.getAllFiles();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public FilePresentation getFile(@PathVariable("id") long id){
            return fileService.getFileById(id);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public FilePresentation addFile(@RequestBody FilePresentation file) {
        return fileService.addFile(file);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public boolean deleteFile(@PathVariable("id") long id) {
        return fileService.deleteFile(id);
    }

    @RequestMapping(value = "/{id}/tag", method = RequestMethod.PUT)
    public FilePresentation setFileTags(@PathVariable("id") Long id, @RequestBody ArrayList<Long> tags) {
        return fileService.setFileTags(id, tags);
    }

}
