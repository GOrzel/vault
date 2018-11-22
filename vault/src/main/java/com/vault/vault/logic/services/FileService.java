package com.vault.vault.logic.services;

import com.vault.vault.logic.exceptions.FileDuplicateException;
import com.vault.vault.logic.exceptions.FileNotExistsException;
import com.vault.vault.logic.exceptions.FileWithoutDataException;
import com.vault.vault.logic.exceptions.TagNotExistsException;
import com.vault.vault.persistence.models.File;
import com.vault.vault.persistence.models.File2Tags;
import com.vault.vault.persistence.models.Tag;
import com.vault.vault.logic.presentations.FilePresentation;
import com.vault.vault.persistence.repositories.File2TagsRepository;
import com.vault.vault.persistence.repositories.FileRepository;
import com.vault.vault.persistence.repositories.TagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.Null;
import java.util.*;

/**
 * Created by User on 2018-11-02.
 */
@Service
public class FileService {

    private static Logger LOG = LoggerFactory.getLogger(FileService.class);


    private FileRepository fileRepository;
    private File2TagsRepository file2TagsRepository;
    private TagRepository tagRepository;

    @Autowired
    public FileService(TagRepository tagRepository, File2TagsRepository file2TagsRepository, FileRepository fileRepository) {
        this.tagRepository = tagRepository;
        this.fileRepository = fileRepository;
        this.file2TagsRepository = file2TagsRepository;
    }


    public List<FilePresentation> getAllFiles() {
        List<FilePresentation> results = new ArrayList<>();

        fileRepository.findAll().forEach(a -> {
            results.add(new FilePresentation(a));
        });

        return results;
    }

    public FilePresentation getFileById(long id) throws FileNotExistsException, FileWithoutDataException {
        File file = fileRepository.getFileById(id);
        if (file == null) throw new FileNotExistsException("There is no file with that ID");
        FilePresentation result = new FilePresentation(file);
        try {
            result.setData(file.getData());
        } catch (NullPointerException e) {
            throw new FileWithoutDataException("Chosen file is empty.");
        }
        return result;

    }

    public FilePresentation addFile(FilePresentation filePresentation) {
            File file = new File();
            file.setName(filePresentation.getName());
            file.setAddDate(new Date());
            file.setHash(String.valueOf(
                    java.util.Arrays.hashCode(
                            filePresentation.getData())));
            if (fileRepository.countFileByHash(file.getHash()) > 0){
                throw new FileDuplicateException("This file already exists in database.");
            }
            file.setData(filePresentation.getData());
            fileRepository.save(file);
            return new FilePresentation(file);
    }

    @Transactional
    public boolean deleteFile(Long id) {
        fileRepository.deleteById(id);
        return true;
    }

    @Transactional
    public FilePresentation setFileTags(long fileId, ArrayList<Long> tagIds) throws TagNotExistsException {
        File file = fileRepository.getFileById(fileId);
        Set<File2Tags> tags = new HashSet<>();
        Set<File2Tags> currentTags = file2TagsRepository.getAllByFile(file);

        for (Long tagId : tagIds) {
            Tag tag = tagRepository.getTagById(tagId);
            if (tag == null) throw new TagNotExistsException("You tried to add nonexistent tag");
            File2Tags newTag = file2TagsRepository.getFile2TagsByFileAndTag(file, tag);
            if (newTag == null) newTag = new File2Tags(file, tag);
            tags.add(newTag);
            currentTags.remove(newTag);
        }
        if (currentTags.size() > 0){
            currentTags.forEach((o) -> file2TagsRepository.deleteByFileAndTag(file,o.getTag()));
        }
        file.setFile2Tags(tags);
        fileRepository.save(file);

        return new FilePresentation(file);
    }
}
