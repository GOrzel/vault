package com.vault.vault.persistence.repositories;

import com.vault.vault.persistence.models.Tag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by User on 2018-11-02.
 */
@Repository
public interface TagRepository extends CrudRepository<Tag, Long> {

    Tag getTagById(long id);
    Tag getTagByName(String name);
    void deleteTagById(long id);
    Long countTagByName(String name);
}
