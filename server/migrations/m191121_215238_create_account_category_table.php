<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%account_category}}`.
 */
class m191121_215238_create_account_category_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%account_category}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(64)->notNull()->unique()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%account_category}}');
    }
}
