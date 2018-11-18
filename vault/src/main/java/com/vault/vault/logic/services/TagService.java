package com.vault.vault.logic.services;

import com.vault.vault.persistence.models.Tag;
import com.vault.vault.logic.presentations.FilePresentation;
import com.vault.vault.logic.presentations.TagPresentation;
import com.vault.vault.persistence.repositories.File2TagsRepository;
import com.vault.vault.persistence.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by User on 2018-11-02.
 */
@Service
public class TagService {


    private TagRepository tagRepository;
    private File2TagsRepository file2TagsRepository;


    @Autowired
    public TagService(TagRepository tagRepository, File2TagsRepository file2TagsRepository){
        this.tagRepository = tagRepository;
        this.file2TagsRepository = file2TagsRepository;
    }

    public List<TagPresentation> getAllTags() {
        List<TagPresentation> results = new ArrayList<>();

        tagRepository.findAll().forEach(a -> {
            results.add(new TagPresentation(a));
        });

        return results;
    }

    public TagPresentation getTagById(long id){
        return new TagPresentation(tagRepository.getTagById(id));
    }

    public TagPresentation getTagByName(String name){
        return new TagPresentation(tagRepository.getTagByName(name));
    }

    public TagPresentation addTag(String name){
        Tag tag = new Tag(name);
        tagRepository.save(tag);
        return new TagPresentation(tag);
    }

    @Transactional
    public boolean deleteTag(long id){
        tagRepository.deleteTagById(id);
        return true;
    }
}
