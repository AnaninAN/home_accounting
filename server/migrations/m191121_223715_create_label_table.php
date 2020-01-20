<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%label}}`.
 */
class m191121_223715_create_label_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%label}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%label}}');
    }
}
