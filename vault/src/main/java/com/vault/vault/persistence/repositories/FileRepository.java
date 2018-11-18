package com.vault.vault.persistence.repositories;

import com.vault.vault.persistence.models.File;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by User on 2018-11-02.
 */
@Repository
public interface FileRepository extends CrudRepository<File, Long> {

    File getFileById(long id);
    File getFileByName(String name);
    File getFileByHash(String hash);
}
