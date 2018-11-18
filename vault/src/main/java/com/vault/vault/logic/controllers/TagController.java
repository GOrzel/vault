package com.vault.vault.logic.controllers;

import com.vault.vault.logic.presentations.TagPresentation;
import com.vault.vault.logic.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by User on 2018-11-02.
 */

@CrossOrigin
@RestController
@RequestMapping("/rest/tag")
public class TagController {

    private TagService tagService;

    @Autowired
    public TagController(TagService tagService){
        this.tagService = tagService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<TagPresentation> getAllTags() {
        return tagService.getAllTags();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public TagPresentation addTag(@RequestParam("name") String name) {
        return tagService.addTag(name);
    }
//requestbody
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public boolean deleteTag(@PathVariable("id") long id) {
        return tagService.deleteTag(id);
    }
}
