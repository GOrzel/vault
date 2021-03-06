package com.vault.vault.persistence.repositories;

import com.vault.vault.persistence.models.File;
import com.vault.vault.persistence.models.File2Tags;
import com.vault.vault.persistence.models.Tag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * Created by User on 2018-11-02.
 */
@Repository
public interface File2TagsRepository extends CrudRepository<File2Tags, Long> {

    void deleteByFileAndTag(File file, Tag tag);
    void deleteAllByFile(File file);
    File2Tags getFile2TagsByFileAndTag(File file, Tag tag);
    Set<File2Tags> getAllByFile(File file);

}
