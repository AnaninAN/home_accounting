<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%account}}`.
 */
class m191121_202321_create_account_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%account}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(64)->notNull()->unique(),
            'amount' => $this->decimal(10, 2),
            'account_category_id' => $this->integer()->notNull()->defaultValue(1),
            'user_id' => $this->integer()->notNull(),
            'currency_id' => $this->integer()->notNull(),
            'created_at'=>$this->integer()->notNull(),
            'updated_at'=>$this->integer()->notNull()
        ]);

        $this->addForeignKey(
            'fk_account_user_id',
            '{{%account}}',
            'user_id',
            'user',
            'id',
            'CASCADE');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk_account_user_id', '{{%account}}');
        $this->dropTable('{{%account}}');
    }
}
